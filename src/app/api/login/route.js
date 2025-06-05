export async function POST(request) {
    const body = await request.json();
    const { username, password } = body;
  
    // MockUser for dev
    const mockUser = { username: 'admin', password: '123456' };
  
    if (username === mockUser.username && password === mockUser.password) {
      return Response.json({ success: true, token: 'mock-jwt-token' });
    }
  
    return Response.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }