import {
  Modal,
  Radio,
  Form,
  Input,
  Row,
  Button,
  Col,
  Checkbox,
  message,
} from "antd";
import styles from "../css/LoginForm.module.css";
import { useState, useRef, useEffect } from "react";
import {
  getCaptcha,
  userIsExist,
  userRegister,
  userLogin,
  getUserById,
} from "../api/user";
import { changeLoginStatus, initUserInfo } from "../redux/userSlice";
import { useDispatch } from "react-redux";

function LoginForm(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const handleOk = () => {};
  const loginFormRef = useRef();
  const registerFormRef = useRef();
  const [captcha, setCaptcha] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    loginPwd: "",
    captcha: "",
    remember: false,
  });

  const [registerInfo, setRegisterInfo] = useState({
    loginId: "",
    nickname: "",
    captcha: "",
    remember: false,
  });

  useEffect(() => {
    captchaClickHandle();
  }, [props.isShow]);

  async function loginHandle() {
    const result = await userLogin(loginInfo);
    if (result.data) {
      const data = result.data;
      if (!data.data) {
        message.error("账号或密码错误");
        captchaClickHandle();
      } else if (!data.data.enabled) {
        message.warning("账号已被禁用");
        captchaClickHandle();
      } else {
        localStorage.userToken = data.token;
        const res = await getUserById(data.data._id);
        dispatch(initUserInfo(res.data));
        dispatch(changeLoginStatus(true));
        handleCancel();
      }
    } else {
      message.warning(result.msg);
      captchaClickHandle();
    }
  }

  function handleCancel() {
    //清空上次的内容
    setRegisterInfo({
      loginId: "",
      nickname: "",
      captcha: "",
    });
    setLoginInfo({
      loginId: "",
      loginPwd: "",
      captcha: "",
      remember: false,
    });
    props.closeModal();
  }

  async function registerHandle() {
    const result = await userRegister(registerInfo);
    console.log(result);
    if (result.data) {
      message.success("用户注册成功，默认密码为 123456");
      dispatch(initUserInfo(result.data));
      dispatch(changeLoginStatus(true));
      handleCancel();
    } else {
      message.warning(result.msg);
      captchaClickHandle();
    }
  }

  async function captchaClickHandle() {
    const res = await getCaptcha();
    setCaptcha(res);
  }

  async function checkLoginIdIsExist(rule, value, callback) {
    const { data } = await userIsExist(value);
    if (data) {
      return Promise.reject("用户已存在");
    }
  }

  /**
   *
   * @param obj 之前整体的状态
   * @param value 当前输入框的值
   * @param key 当前输入框的key
   * @param setObj
   */
  function updateInfo(oldInfo, value, key, setInfo) {
    const obj = { ...oldInfo };
    obj[key] = value;
    setInfo(obj);
  }

  let container = null;
  if (value === 1) {
    container = (
      <div className={styles.container}>
        <Form
          name="basic1"
          autoComplete="off"
          onFinish={loginHandle}
          ref={loginFormRef}
        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号",
              },
            ]}
          >
            <Input
              placeholder="请输入你的登录账号"
              value={loginInfo.loginId}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, "loginId", setLoginInfo)
              }
            />
          </Form.Item>

          <Form.Item
            label="登录密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password
              placeholder="请输入你的登录密码，新用户默认为123456"
              value={loginInfo.loginPwd}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, "loginPwd", setLoginInfo)
              }
            />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            name="logincaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      loginInfo,
                      e.target.value,
                      "captcha",
                      setLoginInfo,
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="remember"
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Checkbox
              onChange={(e) =>
                updateInfo(
                  loginInfo,
                  e.target.checked,
                  "remember",
                  setLoginInfo,
                )
              }
              checked={loginInfo.remember}
            >
              记住我
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              登录
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    container = (
      <div className={styles.container}>
        <Form
          name="basic2"
          autoComplete="off"
          ref={registerFormRef}
          onFinish={registerHandle}
        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号，仅此项为必填项",
              },
              // 验证用户是否已经存在
              { validator: checkLoginIdIsExist },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="请输入账号"
              value={registerInfo.loginId}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "loginId",
                  setRegisterInfo,
                )
              }
            />
          </Form.Item>

          <Form.Item label="用户昵称" name="nickname">
            <Input
              placeholder="请输入昵称，不填写默认为新用户xxx"
              value={registerInfo.nickname}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "nickname",
                  setRegisterInfo,
                )
              }
            />
          </Form.Item>

          <Form.Item
            name="registercaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={registerInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      registerInfo,
                      e.target.value,
                      "captcha",
                      setRegisterInfo,
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              注册
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  return (
    <div>
      <Modal
        title="注册/登录"
        open={props.isShow}
        onOk={handleOk}
        onCancel={props.closeModal}
      >
        <Radio.Group
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={styles.radioGroup}
          buttonStyle={"solid"}
        >
          <Radio.Button value={1} className={styles.radioButton}>
            登录
          </Radio.Button>
          <Radio.Button value={2} className={styles.radioButton}>
            注册
          </Radio.Button>
        </Radio.Group>
        <div className={styles.container}>{container}</div>
      </Modal>
    </div>
  );
}

export default LoginForm;
