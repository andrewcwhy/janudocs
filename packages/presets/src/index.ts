


const plugins: PluginConfig[] = [];

if (docs != false) {
    plugins.push('@janudocs/docs');
}
if (blog != false) {
    plugins.push('@janudocs/blog');
}
