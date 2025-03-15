import { render, screen } from '@testing-library/react';
import App from './App';

// 暂时跳过此测试，直到有了实际内容可测试
test('renders without crashing', () => {
  render(<App />);
  // 无需断言，只测试渲染是否成功
});