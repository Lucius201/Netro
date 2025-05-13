import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 12);
    return hash;
}

export async function comparePassword(
    password: string,
    hash: string,
): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

hashPassword("secret").then((hash) => console.log(hash));
