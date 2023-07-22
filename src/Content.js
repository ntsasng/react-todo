/**
 * Lý thuyết về useEffect
 * 1. useEffect(callback)
 *  - Gọi callback mỗi khi component re-render
 *  - Gọi callback sau khi component thêm element vào trong DOM
 * 2. useEffect(callback,[])
 *  - Chỉ gọi callback một lần sau khi component được mounted
 * 3. useEffect(callback, [deps]
 *  - Callback sẽ được gọi mỗi khi deps thay đổi
 *  ---------------------------------------------------------
 * Callback sẽ được chạy sau khi component được mounted
 * Cleanup function luôn được gọi sau khi component unmounted
 * Cleanup function luôn được gọi trước khi callback được gọi, trừ lần mounted đầu tiên
 * --------------------------------
 * useEffect
 *  - Cập nhật lại state
 *  - Cập nhật lại DOM (mutated)
 *  - Render lại UI
 *  - Gọi cleaning up nếu deps thay đổi
 *  - Gọi lại useEffect callback
 * useLayoutEffect
 *  - Cập nhật lại state
 *  - Cập nhật lại DOM (mutated)
 *  - Gọi cleaning up nếu deps thay đổi (sync)
 *  - Gọi useLayoutEffect callback (sync)
 *  - Render lại UI
 *
 * React.memo - Higher Order Components HOC
 * useCallback
 */
import { useEffect, useState, useLayoutEffect, useRef } from "react";
const lessons = [
  {
    id: 1,
    name: "Khoa hoc PHP",
  },
  {
    id: 2,
    name: "Khoa hoc JavaScript",
  },
  {
    id: 3,
    name: "Khoa hoc JavaScript nang cao",
  },
];
function Content() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs"));
    return storageJobs;
  });

  const handleSubmit = () => {
    setJobs((prev) => {
      const newJobs = [...prev, job];
      // Save to local storage
      const localJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", localJobs);
      return newJobs;
    });
    setJob("");
  };
  const handleDelete = (index) => {
    setJobs((prev) => {
      const updateJobs = [...prev];
      updateJobs.splice(index, 1);
      const jsonJob = JSON.stringify(updateJobs);
      localStorage.setItem("jobs", jsonJob);
      return updateJobs;
    });
  };

  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState(["posts"]);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [countDown, setCountDown] = useState(180);
  const [avatar, setAvatar] = useState();
  const [lessonId, setLessonId] = useState(1);

  const tabs = ["posts", "comments", "albums"];
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, [type]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShowGoToTop(true);
        console.log("Set State");
      } else {
        setShowGoToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interVal = setInterval(() => {
      setCountDown((prev) => prev - 1);
      // console.log("Counting down ...");
    }, 1000);
    return () => {
      clearInterval(interVal);
    };
  }, []);
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(avatar);
    };
  }, [avatar]);
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    e.target.files.length > 0 && setAvatar(URL.createObjectURL(file));
    e.target.value = null;
  };
  const [contentComments, setContentComments] = useState([]);
  useEffect(() => {
    const handleComment = ({ detail }) => {
      setContentComments((prev) => [...prev, detail]);
    };
    window.addEventListener(`lesson-${lessonId}`, handleComment);
    return () => {
      window.removeEventListener(`lesson-${lessonId}`, handleComment);
    };
  }, [lessonId]);
  const [countUp, setCountUp] = useState(0);
  useLayoutEffect(() => {
    if (countUp > 9) setCountUp(0);
  }, [countUp]);
  const handleSetCountUp = () => {
    setCountUp(countUp + 1);
  };

  const [timerCount, setTimerCount] = useState(60);
  let timerId = useRef();
  const [isStop, setIsStop] = useState(false);
  const handleStart = () => {
    timerId.current = setInterval(
      () => setTimerCount((prev) => prev - 1),
      1000
    );
    setIsStop(true);
    console.log("Start timer: ", timerId.current);
  };
  const handleStop = () => {
    clearInterval(timerId.current);
    setIsStop(false);
    console.log("Stop timer: ", timerId.current);
  };

  return (
    <div className="App">
      <p>Count Up To 3</p>
      <h3>{countUp}</h3>
      <button onClick={handleSetCountUp}>Run Count Up</button>
      <p>Timer Count Down</p>
      <h3>{timerCount}</h3>

      <button type="button" onClick={handleStart} disabled={isStop}>
        Start
      </button>

      <button type="button" onClick={handleStop} disabled={!isStop}>
        Stop
      </button>
      <ul>
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            style={{
              color: lessonId === lesson.id ? "red" : "#FFF",
              cursor: "pointer",
            }}
            onClick={() => setLessonId(lesson.id)}
          >
            {lesson.name}
          </li>
        ))}
      </ul>
      <p>Comments</p>
      <ul>
        {contentComments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      {/*       
      <h3>{countDown}</h3>
      <h2>{width}</h2>
      <input type="file" name="file" id="file" onChange={handlePreviewAvatar} />
      {avatar && <img src={avatar} alt="avatar" width="50%" />}
      <input
        type="text"
        placeholder="Input your task"
        value={job}
        onChange={(e) => setJob(e.target.value)}
      />
      <button onClick={handleSubmit}>Add task</button>
      <ul className="list-task">
        {jobs.map((job, index) => (
          <li key={index}>
            {job}
            <span
              onClick={() => handleDelete(index)}
              style={{ color: "red", cursor: "pointer" }}
            >
              {" "}
              x
            </span>
          </li>
        ))}
      </ul>

      <input onChange={(e) => setTitle(e.target.value)} value={title} />
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={tab}
          onClick={() => setType(tab)}
          style={type === tab ? { fontWeight: "700", color: "#f00" } : {}}
        >
          {tab}
        </button>
      ))}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title || post.name}</li>
        ))}
      </ul>
      {showGoToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          type="button"
          style={{ position: "fixed", bottom: 20, right: 20 }}
        >
          Go to top
        </button>
      )} */}
    </div>
  );
}

export default Content;
