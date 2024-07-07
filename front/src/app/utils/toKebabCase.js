function toKebabCase(name) {
    const lowerCaseName = name.toLowerCase();
    const kebabCaseName = lowerCaseName.replace(/\s+/g, "-");
    return kebabCaseName;
}

export default toKebabCase;
