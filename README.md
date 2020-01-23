# 🐘 `rm-pg-dbs`

[![NPM](https://img.shields.io/npm/v/@lffg-scripts/rm-pg-dbs.svg?logo=npm)](https://www.npmjs.com/package/@lffg-scripts/rm-pg-dbs)

Drop PostgreSQL databases—in bulk, **as you select**.  
[Watch an introduction video here.](https://www.youtube.com/watch?v=9qz3EuNMDfU)

```
yarn global add @lffg-scripts/rm-pg-dbs
```

And run it via:

```
rm-pg-dbs
```

Be default, this CLI will connect to the `localhost:5432` PostgreSQL database as `postgres` user with `postgres` password. The default database which will be connected is `postgres`.

You can override the default connection options with the following environment variables:

- `PGHOST`;
- `PGPORT`;
- `PGUSER`;
- `PGPASSWORD`;
- `PGDATABASE`.

You can set the `ALLOW_ANY_DROP` environment variable to `true` to enable the deletion of the `postgres`, `<your-os-username>`, `template1` and `template0` databases, which are filtered out of the selection list by default. You should not do this, though.

---

License MIT.  
Copyright &copy; [Luiz Felipe Gonçalves](https://luizfelipe.dev).
