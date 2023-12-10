import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getLoggedUser() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;
  console.log(data);
  return user;
}
