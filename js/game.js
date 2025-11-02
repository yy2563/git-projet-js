
window.onload = () => {
    let count = 0;
    let mone = 0; // מתי הוא ילך לפונקציה אחרי 4 לחיצות
    let myArr = [];
    let ArrPush = [];
    let colorArr = ["red", "blue", "green", "yellow", "pink", "purple", "orange"];
    let randColor = [];

    function generateRandomColors() {// פונקציית הגרלה
        let tempColors = [...colorArr];
        randColor = [];// מערך של ההגרלה
        for (let i = 0; i < 4; i++) {
            const randIndex = Math.floor(Math.random() * tempColors.length);
            randColor.push(tempColors.splice(randIndex, 1)[0]);
        }
    }
    generateRandomColors();// שליחה לפונקציית ההגרלה
    console.log("קוד צבעים אקראי:", randColor);

    colorArr.forEach(color => {// יצירת כפתורים
        const colorDiv = document.createElement("div"); // יוצר מקום לכפתור
        colorDiv.id = color;// קורא לו שם
        const colorButton = document.createElement("button");// יוצר כפתור
        colorButton.textContent = color; // שם בכפתור
        colorButton.style.backgroundColor = color;//צבע לכפתור
        colorDiv.appendChild(colorButton);
        document.querySelector(".colors").appendChild(colorDiv);

        colorButton.addEventListener("click", () => {// כל פעם שלוחצים להוסיף אירוע
            clickSound2.play();//שמע שלוחצים 

            let a = false
            if (myArr.length < 1) {
                myArr.push(color) // יוצר מערך של מה שבחרתי
                count++ // מעלה למקום הבא
                document.getElementById(count + "").style.backgroundColor = color
                mone++
                console.log(myArr);

            }
            else {
                for (let index = 0; index < myArr.length; index++) { // בודק לי אם לחצתי פעמיים על כפתור
                    if (myArr[index] == color) {
                        alert("can't choose duplicate color")
                        a = true
                    }
                }
                if (!a) {
                    myArr.push(color) // יוצר מערך של מה שבחרתי
                    count++  //צובע לי את העיגול במקום הקאונט
                    document.getElementById(count + "").style.backgroundColor = color // 
                    mone++// מעלה את המונה
                    console.log(myArr);
                }
            }

            if (mone === 4) {// אם המונה שלי מגיעה ל4 אז תלך לפונקציה ותראה אם מה שבחרתי נכון
                calc()// שולח לפונקציית בדיקה 
                myArr = [];// מאפס את המערך
                mone = 0;// מאפס את המונה כדי לבדוק שוב
            }
        })
    })
    let c = 0

    //פונקצה לחישוב בול פגיעה
    function calc() {

        let bool = 0;
        for (let i = 0; i < 4; i++) {
            if (randColor[i] == myArr[i]) {// אם זה פגיעיה אז תצבע שחור
                if (ArrPush[c]) ArrPush[c].style.backgroundColor = "black";
                bool++
            } else
                if (randColor.includes(myArr[i])) {// אם זה נצמא במערך של ההגרלה אז תצבע בלבן
                    if (ArrPush[c]) ArrPush[c].style.backgroundColor = "white";
                }
            // tempRandColor[tempRandColor.indexOf(myArr[i])] = null;  
            c++;
        }
        if (bool === 4)// אם זה בול הלך להצלחות
            win()

        if (count === 32) {
            for (let index = 0; index < 4; index++) {
                const iiii = index + 100
                document.getElementById(iiii + "").style.backgroundColor = randColor[index]
            }
            failure()
        }
    }
/// יוצר לי את טבלת המשחק
    let zover = 1;
    let zover1 = 1;
    let kod = 100;
    for (let i = 0; i < 8; i++) {// יוצר את השורות
        const togethere = document.createElement("div");
        togethere.className = "togethere";

        const colors = document.createElement("div");
        colors.className = "colors";

        const status = document.createElement("div");
        status.className = "status";

        for (let j = 0; j < 4; j++) { // יוצר את העיגולים
            const circle = document.createElement("div");
            circle.className = "circle";
            circle.id = `${zover++}`;
            colors.appendChild(circle);
        }

        for (let j = 0; j < 4; j++) {// יוצר את הבדיקה
            const sign = document.createElement("div");
            sign.className = "sign";
            sign.id = `${zover1++}`;
            ArrPush.push(sign);
            status.appendChild(sign);
        }

        togethere.appendChild(colors);
        togethere.appendChild(status);
        document.getElementById("game").appendChild(togethere);
    }

    const togethere1 = document.createElement("div");
    togethere1.className = "togethere";
    togethere1.style.zIndex = "2";

    const colors = document.createElement("div");
    colors.className = "colors";
    colors.id = "display";

    for (let k = 0; k < 4; k++) {// יוצר לי מקום לקוד הסודי
        const circle = document.createElement("div");
        circle.className = "circle";
        circle.id = `${kod++}`;
        colors.appendChild(circle);
    }

    const status = document.createElement("div");
    status.className = "status";
    const h2 = document.createElement("h2");
    h2.textContent = "הקוד הסודי";

    togethere1.appendChild(colors);
    togethere1.appendChild(status);
    status.appendChild(h2);
    document.getElementById("game").appendChild(togethere1);

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = JSON.parse(localStorage.getItem("user"));
    const suc = document.querySelector("#success");
    const fail = document.querySelector("#failure");
    console.log(fail);
    suc.innerHTML = suc.innerHTML + " " + user.win
    fail.innerHTML = fail.innerHTML + " " + user.failure

    let clickSound = document.getElementById("clickSound");// פסילה
    let clickSound1 = document.getElementById("clickSound1");// ניצחון
    let clickSound2 = document.getElementById("clickSound2");// כפתור

    const win = () => {//פונקצית ניצחון 
        clickSound1.play();
        user.win++
        for (let i = 0; i < users.length; i++) {
            if (users[i].name === user.name && users[i].password === user.password) {
                users[i].win = user.win
            }
        }
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(user));
        const winwin = document.querySelector(".winwin")
        winwin.style.display = "flex"
        const newGame = document.querySelector(".newGame")
        newGame.addEventListener("click", () => {
            window.location.href = "../html./game.html"
        })
    }
    const failure = () => {//פונקציית פסילה
        clickSound.play();

        user.failure++
        for (let i = 0; i < users.length; i++) {
            if (users[i].name === user.name && users[i].password === user.password) {
                users[i].failure = user.failure
            }
        }
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(user));
        const failure = document.querySelector(".failure")
        failure.style.display = "flex"

        const newGame = document.querySelector(".newGame1")
        newGame.addEventListener("click", () => {
            window.location.href = "../html./game.html"
        })
    }
}
