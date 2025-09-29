// import { useState } from "react";
// import {useForm}from 'react-hook-form'
// import{FormErrorMessage, FormLabel, FormControl, Input, Button} from '@chakra-ui/react'
// import RegisterCard from "./RegisterCard";
// import { data, useNavigate } from "react-router-dom";


// // export default function Home(){
// //   const [userId, setUserId]=useState("");
// //   const [err, setErr]=useState("");
// //   const [loading,setLoading ]=useState("");
// //   const navigate = useNavigate();


// //   const {register, formState:{errors}}=useForm();

// //   const handleSearch =()=>{
// //     if(!userId)
// //       alert("ユーザーIDを入力してください")
// //     return;
// //   }
// //   navigate(`/cards/${userId}`);

  


// //   return(
// //     <form action="">
// //       <FormControl>
// //         <FormLabel>ID</FormLabel>
// //         <input id="name" {...register('name', {
// //           required:'idは必須です'
// //         })}
// //         />
// //         <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
// //       </FormControl>

// //       <Button onClick={()=>{handleSearch("sample-id")}}>名刺を見る</Button>

// //       <Button onClick={()=>{navigate("/cards/register")}}>新規登録はこちら</Button>
// //     </form>
// //     )}

// // }


// export default function Home(){
//   // const [userId, setUserId]=useState("");   

//   const navigate = useNavigate();

//   const {register, handleSubmit, formState:{errors}}=useForm();

//   // const handleSearch =(id?: string)=>{ // npidを引数に受け取れるようにする
//   //   const targetId = id || userId;     // 引数があれば使う。なければ入力値を使う
//   //   if(!targetId){
//   //     alert("ユーザーIDを入力してください");
//   //     return;
//   //   }
//   //   navigate(`/cards/${targetId}`);   // ← navigateはここで呼ぶ
//   // }


//   const onSubmit=(data:any)=>{
//     navigate(`/cards/${data.userId}`)
    
//   }


//   return(
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <FormControl isInvalid={!!errors.name}>
//         <FormLabel>ID</FormLabel>
//         {/* registerした値を state にも反映する */}
//         <Input
//           id="userId"
//           {...register("userId", { required: "idは必須です" })}
//           // onChange={(e)=>setUserId(e.target.value)}  // 入力されたら userId 更新
//         />
//         <FormErrorMessage>{errors.userId?.message as string}</FormErrorMessage>
//       </FormControl>

//       {/* ボタン1: 入力したIDでカードページへ */}
//       <Button type="submit">名刺を見る</Button>

//       {/* ボタン2: 新規登録画面へ */}
//       <Button onClick={()=>navigate("/cards/register")}>新規登録はこちら</Button>
//     </form>
//   )
// }




// -----
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ userId: string }>();

  const onSubmit = (data: { userId: string }) => {
    navigate(`/cards/${data.userId}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.userId}>
        {/* ラベルと input を紐付ける */}
        <FormLabel htmlFor="userId">ID</FormLabel>
        <Input
          id="userId"
          {...register("userId", { required: "idは必須です" })}
        />
        <FormErrorMessage>
          {errors.userId?.message as string}
        </FormErrorMessage>
      </FormControl>

      {/* ボタン1: 入力したIDでカードページへ */}
      <Button type="submit" colorScheme="blue" mt={4}>
        名刺を見る
      </Button>

      {/* ボタン2: 新規登録画面へ */}
      <Button
        type="button"
        colorScheme="teal"
        mt={4}
        onClick={() => navigate("/cards/register")}
      >
        新規登録はこちら
      </Button>
    </form>
  );
}
