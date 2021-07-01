import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Layout from "../../layout/Layout";
import { useTranslation } from "react-i18next";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./auth.pages.scss";
import { signupSuccess } from "../../store/actions/auth.action";

function SignUp() {
  const { t } = useTranslation();
  let history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const { register, handleSubmit, errors, reset } = useForm();
  const [data, setData] = useState(""); //TO Store data message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (formData.password !== formData.confirm_password) {
      setData("Passwords don't match");
      return;
    }

    try {
      const result = await axios.post("http://localhost:4000/auth/signup", {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
      });

      dispatch(
        signupSuccess({
          messages: result.data.message,
          user: result.data.data[0],
        })
      );

      history.push("/accounts/sign-up-confirmation");
    } catch (error) {
      if (error.response) {
        setData(error.response.data.message);
      } else {
        setData(error.message);
      }
    }
  };

  return (
    <>
      <Layout>
        <Container>
          <Row className="signin justify-content-md-center">
            <Col sm={12} className="signin-column">
              <h2 className="signin-column-heading">{t("sign_up_title")}</h2>
            </Col>
            <Col className="justify-content-center d-flex pt-2" xs={12}>
              <a
                href="http://localhost:4000/github/login"
                style={{ width: "100%" }}
              >
                <Button
                  className="align-items-center signup-column-github d-flex align-item-center justify-content-center"
                  style={{
                    background: "#262D4D",
                    borderColor: "#262D4D",
                    color: "#FFFFFF",
                    height: 50,
                    fontSize: "1.2rem",
                  }}
                  block
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    style={{
                      marginRight: 10,
                      fontSize: "2rem",
                    }}
                  />
                  {t("sign_up.buttons.github")}
                </Button>
              </a>
            </Col>
            <Col className="justify-content-center d-flex" xs={12}>
              <a
                href="http://localhost:4000/google/login"
                style={{ width: "100%" }}
              >
                <Button
                  className="align-items-center signup-column-google d-flex align-item-center justify-content-center"
                  style={{
                    background: "#0073E8",
                    borderColor: "#0073E8",
                    color: "#FFFFFF",
                    height: 50,
                    fontSize: "1.2rem",
                  }}
                  block
                >
                  <FontAwesomeIcon
                    icon={faGoogle}
                    style={{ marginRight: 10, fontSize: "2rem" }}
                  />
                  {t("sign_up.buttons.google")}
                </Button>
              </a>
            </Col>
            <Col xs={12} className="signin-column">
              <div className="signup-column-form">
                <Form
                  className="pb-5 pt-2 form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Row className="formSpacing">
                    <Col>
                      <Form.Label>{t("sign_up.fields.first_name")}</Form.Label>
                      <Form.Control
                        placeholder={t("sign_up.fields.first_name")}
                        value={formData.first_name}
                        name="first_name"
                        ref={register({
                          required: true,
                          pattern: /^[A-Za-z]+$/i,
                        })}
                        onChange={handleChange}
                      />
                      {errors.first_name?.type === "required" && (
                        <p>"first_Name Is required"</p>
                      )}{" "}
                      {errors.first_name?.type === "pattern" && (
                        <p>"first_Name should be Alphabetical"</p>
                      )}
                    </Col>
                    <Col>
                      <Form.Label>{t("sign_up.fields.last_name")}</Form.Label>
                      <Form.Control
                        placeholder={t("sign_up.fields.last_name")}
                        value={formData.last_name}
                        name="last_name"
                        ref={register({
                          required: true,
                          pattern: /^[A-Za-z]+$/i,
                        })}
                        onChange={handleChange}
                      />
                      {errors.last_name?.type === "required" && (
                        <p>"last_Name Is required"</p>
                      )}{" "}
                      {errors.last_name?.type === "pattern" && (
                        <p>"last_Name should be Alphabetical"</p>
                      )}
                    </Col>
                  </Row>
                  <Row className="formSpacing">
                    <Col>
                      <Form.Label>{t("sign_up.fields.email")}</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={t("sign_up.fields.email")}
                        name="email"
                        ref={register({
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email?.type === "required" && (
                        <p>"email Is required"</p>
                      )}
                      {errors.email?.type === "pattern" && (
                        <p>"Invalid email address"</p>
                      )}
                    </Col>
                  </Row>
                  <Row className="formSpacing">
                    <Col>
                      <Form.Label>{t("sign_up.fields.password")}</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={t("sign_up.fields.password")}
                        name="password"
                        ref={register({ required: true, minLength: 6 })}
                        value={formData.password}
                        autoComplete="off"
                        onChange={handleChange}
                      />
                      {errors.password?.type === "required" && (
                        <p>"password Is required"</p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p>"you have to enter at least 6 characters"</p>
                      )}
                    </Col>
                    <Col>
                      <Form.Label>
                        {t("sign_up.fields.confirm_password")}
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={t("sign_up.fields.confirm_password")}
                        name="confirm_password"
                        ref={register({ required: true })}
                        value={formData.confirm_password}
                        autoComplete="off"
                        onChange={handleChange}
                      />
                      {errors.confirm_password && (
                        <p>"Confirm_Password Is required"</p>
                      )}
                    </Col>
                  </Row>
                  {!data ? "" : <Alert variant="info">{data}</Alert>}
                  <Row className="formSpacing">
                    <Col className="align-items-right">
                      <Row className="align-items-center">
                        <Col lg={6} xs={12}>
                          <Button
                            sm={6}
                            variant="primary"
                            type="submit"
                            className="primaryBtn"
                            block
                          >
                            {t("sign_up.buttons.signup")}
                          </Button>
                        </Col>
                        <Col lg={6} xs={12}>
                          <Button
                            sm={6}
                            variant="outline-primary"
                            className="primary-outline-btn"
                            block
                            onClick={() => {
                              setFormData({
                                confirm_password: "",
                                email: "",
                                first_name: "",
                                last_name: "",
                                password: "",
                              });
                              reset();
                            }}
                          >
                            {t("sign_up.buttons.clear")}
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col style={{ paddingBlock: "12px" }}></Col>
                  </Row>
                  <Row className="formSpacing">
                    <Col style={{ paddingBlock: "12px" }}>
                      {t("sign_up.text")}
                      <Link
                        to="/accounts/sign-in/"
                        style={{
                          color: "#8731d2",
                          textDecoration: "underline",
                        }}
                      >
                        {t("sign_in.buttons.signin")}
                      </Link>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default SignUp;