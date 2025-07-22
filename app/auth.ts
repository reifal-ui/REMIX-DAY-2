const usersDB = [
    {id: "1", username: "admin", password: "admin123", role: "admin"},
    {id: "2", username: "user", password: "user123", role: "user"}
];

export async function verifyLogin(username: string, password: string) {
    const user = usersDB.find(u => u.username === username && u.password === password);

    if (!user) return null;
    return {
        id: user.id,
        username: user.username,
        role: user.role
    };
}

export async function getUserById(id: string) {
   return usersDB.find(u => u.id === id);
}