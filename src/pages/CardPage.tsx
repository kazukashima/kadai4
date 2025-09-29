// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { supabase } from "../../supabase";
// import { Box, Heading, Text, List, ListItem, Card, CardBody, Stack, StackDivider, Link } from "@chakra-ui/react";

// // オブジェクト型で型を定義
// type User = {
//   id: string;
//   name: string | null;
//   description: string | null;
//   github_id: string | null;
//   qiita_id: string | null;
//   x_id: string | null;
// };

// export default function CardPage() {
//   const { id } = useParams<{ id: string }>();

//   const [user, setUser] = useState<User | null>(null);
//   const [skills, setSkills] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;
//     let cancelled = false;

//     const run = async () => {
//       setLoading(true);
//       setErr(null);

//       const { data: u, error: e1 } = await supabase
//         .from("users")
//         .select("id,name,description,github_id,qiita_id,x_id")
//         .eq("id", id)
//         .single();

//       if (e1 || !u) {
//         if (!cancelled) {
//           setErr("ユーザーが見つかりません");
//           setLoading(false);
//         }
//         return;
//       }

//       const { data: us, error: e2 } = await supabase
//         .from("user_skill")
//         .select("skill_id")
//         .eq("user_id", id);

//       if (e2) {
//         if (!cancelled) {
//           setErr("スキルの取得に失敗しました");
//           setLoading(false);
//         }
//         return;
//       }

//       const skillIds = (us ?? []).map((row) => row.skill_id);
//       let names: string[] = [];

//       if (skillIds.length > 0) {
//         const { data: ss, error: e3 } = await supabase
//           .from("skills")
//           .select("name")
//           .in("id", skillIds);

//         if (e3) {
//           if (!cancelled) {
//             setErr("スキルの取得に失敗しました");
//             setLoading(false);
//           }
//           return;
//         }
//         names = (ss ?? []).map((s) => s.name as string);
//       }

//       if (!cancelled) {
//         setUser(u as User);
//         setSkills(names);
//         setLoading(false);
//       }
//     };

//     run();
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   if (!id) return <Text>Loading...</Text>;
//   if (loading) return <Text>Loading...</Text>;
//   if (err) return <Text>{err}</Text>;
//   if (!user) return <Text>ユーザーが見つかりません</Text>;

//   const githubUrl = user.github_id ? `https://github.com/${user.github_id}` : null;
//   const qiitaUrl = user.qiita_id ? `https://qiita.com/${user.qiita_id}` : null;
//   const xUrl = user.x_id ? `https://x.com/${user.x_id}` : null;

//   return (
//     <box p={6} display="flex justifyContent="center>
//       <Card maxW="sm" shadow="md" borderRadius="lg" w="100%">
//         <CardBody>
//           <Stack divider={<StackDivider />} spacing="4">
//           {/* {名前} */}
//           <Box>
//             <Heading size="md">{user.name ?? "(無名)"}</Heading>
//           </Box>

//     <Box p={4}>
//       {/* 紹介文 */}
//       <Box mb={6}>
//         <Heading as="h2" size="md" mb={2}>紹介文</Heading>
//         <Text whiteSpace="pre-wrap">{user.description ?? ""}</Text>
//       </Box>

//       {/* スキル */}
//       <Box mb={6}>
//         <Heading as="h2" size="md" mb={2}>スキル</Heading>
//         {skills.length === 0 ? (
//           <Text>スキル未登録</Text>
//         ) : (
//           <List spacing={2}>
//             {skills.map((s) => (
//               <ListItem key={s}>{s}</ListItem>
//             ))}
//           </List>
//         )}
//       </Box>

//       {/* SNS */}
//       <Box>
//         <Heading as="h2" size="md" mb={2}>SNS</Heading>
//         <List spacing={2}>
//           {githubUrl && <ListItem><a href={githubUrl} target="_blank">GitHub</a></ListItem>}
//           {qiitaUrl && <ListItem><a href={qiitaUrl} target="_blank">Qiita</a></ListItem>}
//           {xUrl && <ListItem><a href={xUrl} target="_blank">X</a></ListItem>}
//           {!githubUrl && !qiitaUrl && !xUrl && <ListItem>未登録</ListItem>}
//         </List>
//       </Box>
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Spinner,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Link,Button
} from "@chakra-ui/react";

type User = {
  id: string;
  name: string | null;
  description: string | null;
  github_id: string | null;
  qiita_id: string | null;
  x_id: string | null;
};

export default function CardPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const run = async () => {
      setLoading(true);

      const { data: u } = await supabase
        .from("users")
        .select("id,name,description,github_id,qiita_id,x_id")
        .eq("id", id)
        .single();

      if (!u) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { data: us } = await supabase
        .from("user_skill")
        .select("skill_id")
        .eq("user_id", id);

      const skillIds = (us ?? []).map((row) => row.skill_id);

      const { data: ss } = await supabase
        .from("skills")
        .select("name")
        .in("id", skillIds);

      setUser(u);
      setSkills((ss ?? []).map((s) => s.name as string));
      setLoading(false);
    };

    run();
  }, [id]);

  if (loading) return <Spinner />;
  if (!user) return <Text>ユーザーが見つかりません</Text>;

  return (
    <Box p={6} display="flex" justifyContent="center">
      <Card maxW="sm" shadow="md" borderRadius="lg" w="100%">
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {/* 名前 */}
            <Box>
              <Heading size="md" mb={2}>
                {user.name ?? "名前未登録"}
              </Heading>
            </Box>

            {/* 自己紹介 */}
            <Box>
              <Heading size="sm" mb={1}>自己紹介</Heading>
              <Text whiteSpace="pre-wrap">{user.description ?? "未登録"}</Text>
            </Box>

            {/* スキル */}
            <Box>
              <Heading size="sm" mb={1}>好きな技術</Heading>
              {skills.length > 0 ? (
                <List>
                  {skills.map((s) => (
                    <ListItem key={s}>{s}</ListItem>
                  ))}
                </List>
              ) : (
                <Text>スキル未登録</Text>
              )}
            </Box>

            {/* SNS */}
            <Box>
              <Heading size="sm" mb={1}>SNS</Heading>
              <List>
                {user.github_id && (
                  <ListItem>
                    <Link href={`https://github.com/${user.github_id}`} isExternal>
                      GitHub
                    </Link>
                  </ListItem>
                )}
                {user.qiita_id && (
                  <ListItem>
                    <Link href={`https://qiita.com/${user.qiita_id}`} isExternal>
                      Qiita
                    </Link>
                  </ListItem>
                )}
                {user.x_id && (
                  <ListItem>
                    <Link href={`https://x.com/${user.x_id}`} isExternal>
                      X
                    </Link>
                  </ListItem>
                )}
                {!user.github_id && !user.qiita_id && !user.x_id && (
                  <ListItem>未登録</ListItem>
                )}
              </List>
            </Box>
            <Box>
              <Button onClick={() => navigate("/")}>戻る</Button>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}


