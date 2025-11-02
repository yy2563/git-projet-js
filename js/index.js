
function toggleForm() {//בודק לי מה פעיל
    document.getElementById("loginForm").classList.toggle("active");
    document.getElementById("registerForm").classList.toggle("active");
}
function login() {// התחברות
    let user = document.getElementById("loginUsername").value
    let password = document.getElementById("loginPassword").value
    let users = JSON.parse(localStorage.getItem("users") || [])
    let userr = users.find(userr => userr.user === user && userr.password === password)
    if (userr) {
        document.getElementById("loginMessage").innerText = " התחברת בהצלחה! ,ואתה מועבר הבית...";
        setTimeout(() => {
                window.location.href = "html/home.html";
                }, 1000);
    }
    else {
        document.getElementById("loginMessage").innerText = " שם ממשתמש או סיסמה שגויים";
    }
}


function bdika() {// בדיקה עם הסיסמה נכונה
    // let user = document.getElementById("loginUsername").value
    let password = document.getElementById("regPassword").value
    let password1 = document.getElementById("password1").value
    if (password === password1)
        register()
}
function register() { //הרשמה
 
    let user = document.getElementById("regUsername").value
    let password = document.getElementById("regPassword").value
    let password1 = document.getElementById("password1").value
   

    if (!user || !password || !password1) { 
         document.getElementById("loginMessage").innerText = " שכחת לכתוב";
        return;
      
    }
    else {

        if (password === password1) {
            let users = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
            let userr = users.find(userr => userr.user === user)
            if (userr) {
                document.getElementById("loginMessage").innerText = "משתמש קיים";
                //  return;
            }
            const win = 0
            const failure = 0
            users.push({ user, password,win,failure })
            localStorage.setItem("users", JSON.stringify(users))
            localStorage.setItem("user", JSON.stringify({ user, password,win,failure  }))
            document.getElementById("regMessage").innerText = "נרשמת בהצלחה! מעביר לדף הבית..."
           // window.location.href = "./game.html";
            // הפניה לדף המשחק אחרי 2 שניות
            setTimeout(() => {
                window.location.href = "html/home.html";
            }, 1000);


        }

    } 


}
