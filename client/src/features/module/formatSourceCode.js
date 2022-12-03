const setupsourcecode = (boilercode,testcase,usercode) => {
    var sourcecode
        if (boilercode === 'JAVA:Lesson1 ' || 'JAVA:Lesson2') {
            sourcecode = `public class Main {
                public static void main(String[] args) {
                  ${usercode}
                  ${testcase}
                }
              }`
        }
        if(boilercode === 'JAVASCRIPT:Lesson1') {
          sourcecode = `${usercode}
          ${testcase}`
        }
        return sourcecode
}
export default setupsourcecode