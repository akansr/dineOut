const name = 'dineOutAPI';

module.exports = {
    name: name,
    paths: {
        build: './build',
        release: './release'
    },
    files: {
        package: 'package.json',
        src: [
            'src/**/*.js'
        ],
        spec: {
            unit: 'spec/unit/**/*.js'
        }
    },
    node_config_dir: 'build/src/config'
}
