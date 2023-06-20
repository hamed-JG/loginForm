import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { validate } from "../components/validate";
import { notify } from "../components/toast";
import styles from "../components/SignUp.module.css";

function LogIn() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(
    () => {
      setErrors(validate(data, "logIn"));
      console.log(errors);
    },
    [data],
    [touched]
  );

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const touchHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      notify("You logged in successfully", "success");
    } else {
      notify("Invalid data", "error");
      setTouched({
        email: true,
        password: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.formContainer}>
        <h2 className={styles.header}>LogIn</h2>
        <div className={styles.formField}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={changeHandler}
            onFocus={touchHandler}
            className={
              errors.email && touched.email
                ? styles.uncompleted
                : styles.formInput
            }
          />
          {errors.email && touched.email && <span>{errors.email}</span>}
        </div>
        <div className={styles.formField}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={changeHandler}
            onFocus={touchHandler}
            className={
              errors.password && touched.password
                ? styles.uncompleted
                : styles.formInput
            }
          />
          {errors.password && touched.password && (
            <span>{errors.password}</span>
          )}
        </div>
        <div className={styles.formButtons}>
          <Link href={"/"}>Sign Up</Link>
          <button type="submit">Sign In</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LogIn;
