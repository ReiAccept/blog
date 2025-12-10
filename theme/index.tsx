import Theme from 'rspress/theme';
import HomeLayout from './layout/HomeLayout'


// const Layout = () => <Theme.Layout beforeNavTitle={<div>some content</div>} />;


export default {
  ...Theme,
  // Layout,
  HomeLayout,
};

// 重导出其他部分
export * from 'rspress/theme';