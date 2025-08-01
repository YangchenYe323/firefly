/**
This is the script used for bootstraping admin profile in the project.
Create a `credential.json` file under this same directory following the example given
in `credential.json.template` to supply bootstrap username and password which can later
be used to access the admin page.
*/
import bcrypt from "bcrypt";
import prisma from "@/db";
import prompt from "prompt-sync";

async function main() {
  console.log("开始创建管理员用户, 请确保.env文件中DATABASE_URL指向正确的生产环境数据库...")

  const p = prompt();

  // Prompt user for admin username and password
  const username = p("请输入管理员用户名: ");

  if (!username) {
    console.error("Username is required");
    process.exit(1);
  }

  const password1 = p("请输入管理员密码: ", { echo: '*' });

  if (!password1) {
    console.error("管理员密码不能为空");
    process.exit(1);
  }


  const password2 = p("请再次输入管理员密码: ", { echo: '*' });

  if (password1 !== password2) {
    console.error("两次输入的密码不一致");
    process.exit(1);
  }

  console.log("创建管理员用户...");
  const salt = await bcrypt.genSalt(8);

  const passwordHash = await bcrypt.hash(password1, salt);

  const user = await prisma.user.create({
    data: {
      username,
      salt,
      password_hash: passwordHash,
    },
  });

  console.log("管理员用户创建成功");
  console.log("用户名: ", username);
  console.log("密码: ", password1);
}

main();
