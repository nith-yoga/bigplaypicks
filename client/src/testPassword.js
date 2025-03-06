const bcrypt = require('bcryptjs');

const password = 'SZsDQ)R^Q>@.T6W';  // Original password
const storedHash = '$2b$10$xehPi2DigORuD5PBc4oMyeAvXvzh2UA5XXbBUY0hNLs1.UrdzkqSu';  // The hash you stored

bcrypt.compare(password, storedHash, function(err, result) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Password match result:', result);  // This should return 'true' if the passwords match
  }
});
