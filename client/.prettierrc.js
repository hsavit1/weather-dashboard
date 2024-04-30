module.exports = {
    plugins: ["@trivago/prettier-plugin-sort-imports"],
    singleQuote: false,
    trailingComma: "none",
    tabWidth: 4,
    semi: false,
    importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true
}
