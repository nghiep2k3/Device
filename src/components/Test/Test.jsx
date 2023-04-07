import axios from 'axios';
import { axiosInstance } from '../../shared/services/http-client';

const Test = () => {
    var listArray = []
    var listUsers = document.querySelector('#root')
    const data = {
        identifier: 'super.admin',
        password: 'Cb@12345',
    };

    xiosInstance.get('/auth/local', data)
        .then((response) => {
            console.log("response");
            render();
        })
    function render() {
        var listUser = listArray.map(function (user) {
            return `
                                <li>
                                    <span>${user.id}</span>    
                                    <span>${user.email}</span>    
                                </li>
                    
                            `;
        });
        listUsers.innerHTML = listUser.join("");
    }


    Test();

}
export default Test;

// const Test = () => {
//     var listArray = []
//     var listUsers = document.querySelector('#root')
//     function fetData() {
//         const data = fetch("https://edison-device-api.savvycom.xyz/api//auth/local")
//         data.then(function (x) {
//             x.json().then(function (y) {
//                 listArray = y
//                 console.log(111, listArray);
//                 render()
//             })
//         })
//     }

//     function render() {
//         var listUser = listArray.map(function (user) {
//             return `
//             <li>
//                 <span>${user.id}</span>
//                 <span>${user.email}</span>
//             </li>

//         `;
//         });
//         listUsers.innerHTML = listUser.join("");
//     }


//     fetData();
// }

// export default Test;
