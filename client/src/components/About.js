import { useNavigate } from "react-router-dom";
const About = () => {
    const navigate = useNavigate();
    return <>
    <h1 className="about-desc">This application was built using MERN stack with Judge0 as an external API for compiling code.</h1>
    <h2 className="poc-desc">This application is currently a work in progress and in Proof of Concept stage. We want to show that the application is using the MERN stack softwares and 
    utilizing the Judge0 API for compiling code in multiple languages. The core functionality is to have an application that gives 
    the user an text editor in a web browser whilst teaching the user code and providing global analtyics</h2>
    <button className="about-back-btn" onClick={()=>navigate("/")}>Back</button>
    </>
  };
  
  export default About;