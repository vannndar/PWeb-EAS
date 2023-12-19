<template>
<div id="app" class="main">
    <input type="email" placeholder="email" v-model="email">
    <br>
    <input type="password" placeholder="password" v-model="pass">
    <br>
    <button @click="login()">Login</button>
    <br>
    <br>
    <button @click="readAccount()">show user</button>
    <br>
    <ul>
        <li v-for="item in user" @click="target = item.id, targetName = item.name">
            {{item.name}} : {{ item.nama }}
        </li>
    </ul>
    <br>
    <input type="text" placeholder="target" v-model="targetName">
    <input type="text" placeholder="pesan" v-model="pesan">
    <button @click="kirimPesan()">kirim pesan</button>
    <br>
    <input type="text" placeholder="ambil pesan dari"  v-model="targetName">
    <button @click="ambilPesan()">ambil pesan</button>
    <br>

    <ul>
        <li v-for="item in pesanNya" >
          {{ item.sender.name }} : {{ item.text }}
        </li>
    </ul>
</div>
</template>

<script>
import {
    ref
} from 'vue';

export default {
    setup() {
        const email = ref('');
        const pass = ref('');
        const name = ref('');
        const id = ref('');
        const user = ref('');
        const target = ref('');
        const targetName = ref('');
        const pesan = ref('');
        const dataPesan = ref('');
        const pesanNya = [];

        const login = async () => {
            try {
                console.log(email.value, pass.value);
                const req = await fetch("http://localhost:3000/api/users/login", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email.value,
                        password: pass.value,
                    }),
                });
                const data = await req.json();
                if (data.message == "Auth Passed") {
                  alert("Login Success");
                    name.value = data.user.name;
                    id.value = data.user.id;
                }
                console.log(data);
            } catch (err) {
                console.error(err);
                alert("Sign up failed");
            }
        };

        const readAccount = async () => {
            try {
                const req = await fetch("http://localhost:3000/api/users");
                const data = await req.json();
                user.value = data.docs;
                console.log(user.value);

                console.log(data);
            } catch (err) {
                console.error(err);
            }
        };

        const kirimPesan = async () => {
          try{
            const req = await fetch("http://localhost:3000/api/message", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: pesan.value,
                        sender: id.value,
                        target: target.value,
                    }),
                });
                const data = await req.json();

                  console.log(data);
          }
          catch(err){
            console.error(err);
          }
        }

        const ambilPesan = async () => {
            try {
                const req = await fetch("http://localhost:3000/api/message");
                const data = await req.json();
                pesanNya.splice(0, pesanNya.length);
                if(Array.isArray(data.docs)){
                  data.docs.forEach(element => {
                    console.log(element.target.name, element.sender.name, targetName.value, name.value)
                    if(element.sender.name == targetName.value && element.target.name == name.value){
                      console.log(element);
                      pesanNya.push(element);
                    }
                  });
                }
                else{
                  console.error("data.docs is not an array or is undefined.");
                }


                console.log(pesanNya);
            } catch (err) {
                console.error(err);
            }
        };


        return {
            email,
            pass,
            name,
            login,
            id,
            readAccount,
            user,
            target,
            targetName,
            pesan,
            kirimPesan,
            ambilPesan,
            dataPesan,
            pesanNya
        };
    },
}
</script>

<style scoped>
.main {
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: white;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
