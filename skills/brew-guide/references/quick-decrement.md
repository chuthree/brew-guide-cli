# Quick Decrement Workflow

用于快捷扣除、拼配补豆、以及补写库存变动记录。

## 记录形状

快捷扣除记录必须写入结构化扣除量：

- `source: "quick-decrement"`
- `quickDecrementAmount: <number>`
- `params.coffee: "<number>g"`
- `method: ""`
- `equipment: ""`
- `rating: 0`
- `totalTime: 0`
- `notes: "快捷扣除"`，或用户明确给出的说明

不要只把扣除量写在 `notes` 文本里；App 的变动记录列表读取的是结构字段。

## 正常快捷扣除

用户要扣某只豆子的库存，并希望留下变动记录：

```bash
brew-guide bean consume <bean-id> --amount 1.5 --with-note --source quick-decrement --dry-run
```

确认后去掉 `--dry-run`。不要再另外 `note add` 一条快捷扣除，避免重复记录。

## 拼配补豆

当一杯记录的主豆不够、需要用另一只豆补到目标粉量：

1. 主萃取记录记在主豆上，`params.coffee` 写总粉量，例如 `18g`。
2. 在主萃取记录的 `notes` 写明拼配，例如 `白巧星云16.5g + 1107 1.5g`。
3. 主豆扣除实际使用量。
4. 补入豆用 `bean consume <补入豆id> --amount <补入量> --with-note --source quick-decrement` 生成变动记录。

不要把补入豆的扣除量只写进主萃取记录；补入豆需要自己的库存变动记录。

## 补写历史变动记录

如果库存已经扣过，但快捷扣除记录缺少或扣除量显示为 `0g`，不要再次运行 `bean consume`。

用 `note add` 补记录：

```bash
brew-guide note add \
  --bean-id "<bean-id>" \
  --quick-decrement-amount 1.5 \
  --notes "用于某次拼配补豆，库存已扣减，本条仅补变动记录" \
  --dry-run
```

用 `note update` 修已有记录：

```bash
brew-guide note update <note-id> --quick-decrement-amount 1.5 --dry-run
```

确认 dry-run 后再正式执行。

## 研磨度记录

用户提到研磨度时，把磨豆机名称和刻度一起写入 `--grind-size`，例如：

```bash
--grind-size "DF54 10.5格"
```

不要只写 `10.5格`，也不要把 `10.5` 误写成 `10.05`。
