# `rm-pg-dbs`

Remove PostgreSQL databases—in bulk, **as you select**.

```
yarn add @lffg-scripts/rm-pg-dbs
```

And run it via:

```
rm-pg-dbs
```

You can override the default connection options with the following environment variables:

- `PG_HOST`;
- `PG_PORT`;
- `PG_USER`;
- `PG_PASSWORD`.

You can also use the `ALLOW_ANY_DROP` environment variable to enable the deletion of the `postgres`, `<your-os-username>`, `template1` and `template0` databases.

---

License MIT.  
Copyright &copy; [Luiz Felipe Gonçalves](https://luizfelipe.dev).
