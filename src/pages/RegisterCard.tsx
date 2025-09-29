// import {
//   FormControl,
//   FormLabel,
//   Textarea,
//   Select,
//   Input,
//   Button,
//   FormErrorMessage,Heading
// } from "@chakra-ui/react";
// import { useForm } from "react-hook-form";
// import { supabase } from "../../supabase";
// import { useNavigate } from "react-router-dom";

// type FormValues = {
//   userId: string;
//   name: string;
//   description: string;
//   skill: string;
//   githubId?: string;
//   qiitaId?: string;
//   xId?: string;
// };

// export default function RegisterCard() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>();

//   const onSubmit = async (data: FormValues) => {
//     console.log("フォームの入力内容", data);

//     const { error: userError } = await supabase.from("users").insert([
//       {
//         id: data.userId,
//         name: data.name,
//         description: data.description,
//         github_id: data.githubId,
//         qiita_id: data.qiitaId,
//         x_id: data.xId,
//       },
//     ]);

//     if (userError) {
//       console.log("データ追加エラー", userError.message);
//       return;
//     }

//     const { error: skillError } = await supabase.from("user_skill").insert([
//       {
//         user_id: data.userId,
//         skill_id: data.skill,
//       },
//     ]);

//     if (skillError) {
//       console.log("データ追加エラー", skillError.message);
//       return;
//     }

//     navigate("/");
//   };

//   return (
//     <>
//       <Heading as="h1" size="lg" mb={4}>
//       名刺新規登録
//       </Heading>
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* ユーザーID */}
//       <FormControl isInvalid={!!errors.userId} isRequired>
//         <FormLabel>好きな英単語</FormLabel>
//         <Input
//           type="text"
//           placeholder="coffee"
//           {...register("userId", {
//             required: "IDは必須です",
//             pattern: {
//               value: /^[a-zA-Z]+$/,
//               message: "英字のみで入力してください",
//             },
//           })}
//         />
//         <FormErrorMessage>{errors.userId?.message as string}</FormErrorMessage>
//       </FormControl>

//       {/* 名前 */}
//       <FormControl isInvalid={!!errors.name} isRequired>
//         <FormLabel>お名前</FormLabel>
//         <Input
//           type="text"
//           {...register("name", { required: "名前は必須です" })}
//         />
//         <FormErrorMessage>{errors.name?.message as string}</FormErrorMessage>
//       </FormControl>

//       {/* 自己紹介 */}
//       <FormControl isInvalid={!!errors.description} isRequired>
//         <FormLabel>自己紹介</FormLabel>
//         <Textarea
//           placeholder="<h1>HTMLタグも使えます</h1>"
//           resize="vertical"
//           {...register("description", { required: "自己紹介は必須です" })}
//         />
//         <FormErrorMessage>
//           {errors.description?.message as string}
//         </FormErrorMessage>
//       </FormControl>

//       {/* 好きな技術 */}
//       <FormControl isInvalid={!!errors.skill} isRequired>
//         <FormLabel>好きな技術</FormLabel>
//         <Select
//           placeholder="Select option"
//           {...register("skill", { required: "技術を選んでください" })}
//         >
//           <option value="1">React</option>
//           <option value="2">TypeScript</option>
//           <option value="3">GitHub</option>
//         </Select>
//         <FormErrorMessage>{errors.skill?.message as string}</FormErrorMessage>
//       </FormControl>

//       {/* 任意入力項目 */}
//       <FormControl>
//         <FormLabel>GitHub ID</FormLabel>
//         <Input type="text" {...register("githubId")} />
//       </FormControl>

//       <FormControl>
//         <FormLabel>Qiita ID</FormLabel>
//         <Input type="text" {...register("qiitaId")} />
//       </FormControl>

//       <FormControl>
//         <FormLabel>X (Twitter) ID</FormLabel>
//         <Input type="text" placeholder="@は不要" {...register("xId")} />
//       </FormControl>

//       <Button type="submit" colorScheme="blue">
//         登録
//       </Button>
//     </form>
//     </>
//   );
// }



// ----
import {
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Input,
  Button,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

type FormValues = {
  userId: string;
  name: string;
  description: string;
  skill: string;
  githubId?: string;
  qiitaId?: string;
  xId?: string;
};

export default function RegisterCard() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log("フォームの入力内容", data);

    const { error: userError } = await supabase.from("users").insert([
      {
        id: data.userId,
        name: data.name,
        description: data.description,
        github_id: data.githubId,
        qiita_id: data.qiitaId,
        x_id: data.xId,
      },
    ]);

    if (userError) {
      console.log("データ追加エラー", userError.message);
      return;
    }

    const { error: skillError } = await supabase.from("user_skill").insert([
      {
        user_id: data.userId,
        skill_id: data.skill,
      },
    ]);

    if (skillError) {
      console.log("データ追加エラー", skillError.message);
      return;
    }

    navigate("/");
  };

  return (
    <>
      <Heading as="h1" size="lg" mb={4}>
        名刺新規登録
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ユーザーID */}
        <FormControl isInvalid={!!errors.userId}>
          <FormLabel>好きな英単語</FormLabel>
          <Input
            type="text"
            placeholder="coffee"
            {...register("userId", {
              required: "IDは必須です",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "英字のみで入力してください",
              },
            })}
          />
          <FormErrorMessage>{errors.userId?.message}</FormErrorMessage>
        </FormControl>

        {/* 名前 */}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>お名前</FormLabel>
          <Input
            type="text"
            {...register("name", { required: "名前は必須です" })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        {/* 自己紹介 */}
        <FormControl isInvalid={!!errors.description}>
          <FormLabel>自己紹介</FormLabel>
          <Textarea
            placeholder="<h1>HTMLタグも使えます</h1>"
            resize="vertical"
            {...register("description", { required: "自己紹介は必須です" })}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        {/* 好きな技術 */}
        <FormControl isInvalid={!!errors.skill}>
          <FormLabel>好きな技術</FormLabel>
          <Select
            placeholder="Select option"
            {...register("skill", { required: "技術を選んでください" })}
          >
            <option value="1">React</option>
            <option value="2">TypeScript</option>
            <option value="3">GitHub</option>
          </Select>
          <FormErrorMessage>{errors.skill?.message}</FormErrorMessage>
        </FormControl>

        {/* 任意入力項目 */}
        <FormControl>
          <FormLabel>GitHub ID</FormLabel>
          <Input type="text" {...register("githubId")} />
        </FormControl>

        <FormControl>
          <FormLabel>Qiita ID</FormLabel>
          <Input type="text" {...register("qiitaId")} />
        </FormControl>

        <FormControl>
          <FormLabel>X (Twitter) ID</FormLabel>
          <Input type="text" placeholder="@は不要" {...register("xId")} />
        </FormControl>

        <Button type="submit" colorScheme="blue" mt={4}>
          登録
        </Button>
      </form>
    </>
  );
}
