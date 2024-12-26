# @shad02w/magic-replace

Replace the patterns in content with given key-value mapper object

## ⚙️ Install

```bash
npm i @shad02w/magic-replace
```

## 📖 Usages

```ts
import {replace} from '@shad02w/magic-replace'


const content = "This is just a list of messages including {a}, {b} and {a}"
replace(["{", "}"], { a: "123", b: "456" }, "This is a {a}, {b} and {a}")
// returns "This is just a list of message including 123, 456 and 123"
```

## LICENSE

MIT


