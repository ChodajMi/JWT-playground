## Detailed Development Report for JWT Learning Playground App

### Overview
The JWT Learning Playground is a static web application designed to demonstrate JWT (JSON Web Token) concepts through an interactive login, registration, and token playground interface. The app simulates user authentication and provides tools to generate, decode, and validate JWT tokens.

### Development Process
The app was developed iteratively, starting with core authentication features and expanding to include registration and token management. The development followed a frontend-only approach using vanilla JavaScript, HTML, and CSS, with localStorage for data persistence to simulate backend API interactions.

### Technologies Used
- **Frontend Framework/Language**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Styling**: Custom CSS with responsive design
- **Data Storage**: Browser localStorage (for simulating API calls)
- **Deployment**: Docker containerized with nginx:alpine
- **CI/CD**: GitHub Actions for automated Docker builds and pushes

### Architecture and Logic

#### 1. **File Structure**
```
jwt-learning-playground/
├── Dockerfile              # Docker configuration
├── login.html             # Login page
├── login.js               # Login logic
├── register.html          # Registration page
├── register.js            # Registration logic
├── playground.html        # JWT playground page
├── playground.js          # Playground functionality
├── style.css              # Global styles
├── login.css              # Login-specific styles
├── playground.css         # Playground-specific styles
├── script/
│   └── jwt-utils.js       # JWT utility functions
├── .github/
│   └── workflows/
│       └── ci.yml         # GitHub Actions CI/CD
└── TODO.md                # Development tasks
```

#### 2. **Core Components**

**JWT Utilities (`script/jwt-utils.js`)**
- Implements JWT generation, decoding, and validation
- Uses base64url encoding/decoding
- Generates signatures using a simple hash function (for demo purposes)
- Validates token expiration and signature integrity

**Authentication Flow**
- **Login Page (`login.html`, `login.js`)**: 
  - Form validation for username/password
  - Checks registered users in localStorage
  - Falls back to hardcoded credentials ('admin'/'1234') for demo
  - Generates JWT token on successful login with 60-second expiration
  - Redirects to playground on success

- **Registration Page (`register.html`, `register.js`)**:
  - Form validation (password confirmation, minimum lengths)
  - Simulates POST API by storing users in localStorage
  - Prevents duplicate usernames
  - Redirects to login after successful registration

**JWT Playground (`playground.html`, `playground.js`)**
- Displays JWT token with color-coded parts (header, payload, signature)
- Real-time countdown timer showing token expiration
- Decode button: Shows decoded payload in JSON format
- Validate button: Checks token validity and signature
- Logout button: Clears localStorage and redirects to login
- Auto-logout when token expires

#### 3. **Key Logic Implementations**

**Token Generation**
```javascript
// Creates JWT with header, payload, and signature
const token = JWTUtils.generateToken(payload, secret);
```

**Token Validation**
```javascript
// Checks signature and expiration
const validation = JWTUtils.validateToken(token, secret);
```

**User Management**
- Registration: Stores users as JSON array in localStorage
- Login: Searches localStorage for matching credentials
- Fallback: Hardcoded admin credentials for initial demo

**Timer Logic**
- Uses setInterval to update countdown every second
- Automatically logs out user when token expires
- Visual feedback with color changes when expired

#### 4. **Styling and UI**
- Responsive design using CSS Grid/Flexbox
- Gradient backgrounds for modern look
- Color-coded token display (blue for header, green for payload, orange for signature)
- Status indicators for validation results
- Consistent form styling across pages

#### 5. **Deployment and CI/CD**
- **Docker**: Uses nginx:alpine to serve static files
- **GitHub Actions**: Automates build and push to Docker Hub on main branch pushes
- **Secrets Management**: Uses GitHub secrets for Docker Hub credentials

### Development Workflow
1. **Planning**: Used TODO.md to track features and tasks
2. **Implementation**: Built pages incrementally (login → registration → playground)
3. **Testing**: Manual testing of authentication flows and token operations
4. **Containerization**: Created Dockerfile for deployment
5. **CI/CD Setup**: Configured GitHub Actions for automated deployment

### Security Considerations
- **Demo Purpose**: Uses simple hash for signatures (not cryptographically secure)
- **Client-Side Only**: All logic runs in browser, tokens stored in localStorage
- **No Real Authentication**: Simulates API calls without actual backend
- **Token Expiration**: Implements time-based expiration for learning purposes

### Future Enhancements
- Backend API integration
- Secure signature algorithms (HMAC-SHA256)
- User sessions with refresh tokens
- Token revocation mechanisms
- Database integration for user management

This app serves as an educational tool for understanding JWT concepts, providing hands-on experience with token generation, decoding, and validation in a controlled, interactive environment.
