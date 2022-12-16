export default function (webpackEnv) {
    return {
      resolve: {
        fallback: {
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
        }
      }
    }
  }