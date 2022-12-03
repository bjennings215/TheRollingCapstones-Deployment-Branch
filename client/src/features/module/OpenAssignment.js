import React from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import base64 from 'base-64'
import axios from 'axios'
import CodeOutput from './Output';
import setupsourcecode from './formatSourceCode';
import boilercode from './boilercode';

//global variables
var codeToRun = '';

//Submissions and checking submissions
const OpenedAssignment = ({module}) => {
  var [output, setOutput] = useState("");
  //data being sent to DB
  const [submitDBData, setDBSubmitData] = useState({
    userID:'15',
    source_code: '',
    language_id: module.language_id,
    stdin:'Y2FwY29kZXM=',
    expected_ouput: '0',
  })

  //data being sent to Judge0
  const [submitData, setSubmitData] = useState({
    userID:'15',
    source_code: '',
    language_id: module.language_id,
    stdin:'Y2FwY29kZXM=',
    expected_ouput: '0'
  })

//navigate for hint feature
 const navigate = useNavigate();

//keeping track of changes in texteditor
 const onChange = (value,viewupdate) => {
    codeToRun = value;
    var base64_encoded_value = base64.encode(setupsourcecode(module.boilercode,module.testcases,codeToRun))
    var e = setSubmitData ({...submitData,source_code: base64_encoded_value})
    var dbe = setDBSubmitData ({...submitData,source_code: codeToRun})
    console.log(submitData)
    return codeToRun;
  }

  console.log(codeToRun);

  const posttoDB = async () => {
    var config = {
      method: 'POST',
      url: 'http://localhost:5000/submitPOST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: submitDBData
  };
              
  axios(config)
      .then(function (response) {
          console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  //checking token out sent after POST
  const checkStatus = async (token) => {
		console.log("checking status")
    const options = {
      method: "GET",
      url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'X-RapidAPI-Key': '0f23b2d723msh6044964d393ec04p164f0djsn82eddec74165',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      }
    }
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        //  processing --> so run again the same token after 2s
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        console.log('response.data', response.data)
        console.log(base64.decode(response.data.stdout))
        console.log(base64.decode(response.data.compile_output))
        output = setOutput(base64.decode(response.data.stdout))
        if (response.data.stdout === null) {
          output = setOutput(base64.decode(response.data.compile_output))
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  };

//submitting and checking answer
    const handleSubmit = async (e) => {
      e.preventDefault();
       console.log(submitData)
       var e = setDBSubmitData ({...submitData,source_code: codeToRun})
        

        const options = {
         method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {base64_encoded: 'true', fields: '*'},
        headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '0f23b2d723msh6044964d393ec04p164f0djsn82eddec74165',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        data: submitData
      };

      await axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data)
        posttoDB()
        const token = response.data.token
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        console.log(error);
      });

    }

    var startingcode = boilercode(module.boilercode)

    return (
      <div className='module'>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>{module.module_name}</div>
        <div>{module.language}</div>
        <div>{module.Full_Desc}</div>
        <CodeMirror
          className='editor'
          height="500px"
          width='1000px'
          extensions={[javascript({ jsx: true })]}
          theme = {atomone}
          onChange = {onChange}
          value = {startingcode}
        />
        <button className='submit-button' variant="contained" color="primary" size="large" type="submit" fullWidth>
                Submit!
                </button>
                </form>
        <CodeOutput className='output' output={output}/>
      </div>
      );
};


 export default OpenedAssignment;