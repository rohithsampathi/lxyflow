type User = {
    email: string;
    password: string;
  };
  
  const users: User[] = [
    { email: 'divya@montaigne.co', password: 'divya@msbs' },
    { email: 'kavya@montaigne.co', password: 'kavya@msbs' },
    { email: 'rohith@montaigne.co', password: 'rohith@msbs' },
  ];
  
  export function authenticateUser(email: string, password: string): boolean {
    return users.some(user => user.email === email && user.password === password);
  }