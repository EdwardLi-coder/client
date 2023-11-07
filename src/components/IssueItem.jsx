import styles from "../css/IssueItem.module.css";
import { Tag } from "antd";
import { formatDate } from "../utils/tools";
import { useDispatch, useSelector } from "react-redux";
import { getTypeList } from "../redux/typeSlice";
import { useEffect, useState } from "react";
import { getUserById } from "../api/user";

function IssueItem(props) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const { typeList } = useSelector((state) => state.type);
  const colorArr = [
    "#108ee9",
    "#2db7f5",
    "#f50",
    "green",
    "#87d068",
    "blue",
    "red",
    "purple",
  ];
  const type = typeList.find((item) => item._id === props.issueInfo.typeId);
  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList());
    }

    async function fetchData() {
      const { data } = await getUserById(props.issueInfo.userId);
      setUserInfo(data);
    }

    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.issueNum}>
        <div>{props.issueInfo.commentNumber}</div>
        <div>回答</div>
      </div>

      <div className={styles.issueNum}>
        <div>{props.issueInfo.scanNumber}</div>
        <div>问题</div>
      </div>

      <div className={styles.issueContainer}>
        <div className={styles.top}>{props.issueInfo.issueTitle}</div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>
              {type?.typeName}
            </Tag>
          </div>
          <div className={styles.right}>
            <Tag color={"volcano"}>{userInfo.nickname}</Tag>
            <span>{formatDate(props.issueInfo.issueDate, "year")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueItem;
