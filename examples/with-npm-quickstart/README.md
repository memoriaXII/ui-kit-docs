# `examples/with-npm-quickstart`

The only example in this repo that **does not** consume the kit
through `file:../..`. Instead it `pnpm install`s the kit from the
public npm registry, the same way a partner team's app would.

Use this one to:

- Verify the `pnpm pack` -> `pnpm publish` pipeline produces a
  tarball that an outside-the-monorepo consumer can actually use.
- Catch issues that the in-tree examples miss (stale `exports`
  field, missing peer dep declarations, side-effect-stripped CSS,
  etc.).
- Hand it to a partner as "here's a ~50-line working starter".

## Install line

```json
// package.json
{
  "dependencies": {
    "@appboxo/ui-kit": "^0.3.2"
  }
}
```

## Run

```bash
cd examples/with-npm-quickstart
pnpm install            # pulls the published kit from npm
pnpm dev                # http://localhost:5173
```

You should see "Installed from npm" with a Freedom-green Primary
button, a Tip icon at ~20x20, and an Input whose focus ring is also
Freedom green.

If anything in that list breaks, the issue is in the **published
artefact**, not in the kit's source. Look at `npm view
@appboxo/ui-kit` and the on-disk shape of
`node_modules/@appboxo/ui-kit/`.

## Why isn't this `examples/basic-app`?

`examples/basic-app` exists too but consumes via `file:../..`
(workspace-style). It's the right starter for someone *inside* the
monorepo. `with-npm-quickstart` is the right starter for someone
*outside*. Both stay around because they prove different things.
