
## Database 

 Create a Turso Database
```
  turso db create venue-admin
```

Get Turso Auth tokens
```
  turso db tokens create venue-admin
```

Set environment variables

```
TURSO_DB_URL=
TURSO_DB_AUTH_TOKEN=
```



```
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    register INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```