const boilercode = (boilercode) => {
    var code
        if (boilercode === 'JAVA:Lesson1') {
            code = `//modify the string
String NAME = <String>;`
        }
        if(boilercode === 'JAVA:Lesson2') {
            code = `//add the two integer variables
int a = 7;
int b = 3;
//modify what is between <>
int sum = <ADD>;`
        }
        if(boilercode === 'JAVASCRIPT:Lesson1') {
            code = `//modify the string
//modify what is between <>          
let mystring = <String>;
`}
        return code
}
export default boilercode