/**
This is the script used for bootstraping admin profile in the project.
Create a `credential.json` file under this same directory following the example given
in `credential.json.template` to supply bootstrap username and password which can later
be used to access the admin page.
*/
import bcrypt from "bcrypt";
import prisma from "@/db";
import { readFile } from "fs/promises";

async function main() {
  const { username, password } = await readFile("scripts/credential.json").then(
    (buf) => JSON.parse(buf.toString("utf-8"))
  );
  const salt = await bcrypt.genSalt(8);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: {
      username,
      salt,
      password_hash: passwordHash,
    },
  });

  console.log(user);
}

main();
