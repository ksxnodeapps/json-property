# json-property
Quickly manipulate JSON files

## Installation

```bash
npm install --global json-property
```

## Command-line usage

### Print JSON content

```bash
get-json-property file.json property_name_1 property_name_2 property_name_3
```

```bash
get-json-property property_name_1 property_name_2 property_name_3 < file.json
```

```bash
cat file.json | get-json-property property_name_1 property_name_2 property_name_3
```

### Modify JSON content

```bash
set-json-property value file.json property_name_1 property_name_2 property_name_3
```

```bash
set-json-property value property_name_1 property_name_2 property_name_3 < input.json > output.json
```

```bash
cat input.json | set-json-property value property_name_1 property_name_2 property_name_3 > output.json
```
