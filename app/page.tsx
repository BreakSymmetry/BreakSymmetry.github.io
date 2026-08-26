import HomeClient from './home-client';
import { isChinaSite } from '@/lib/site-variant';

export default function Home() {
  return (
    <HomeClient
      initialLocale={isChinaSite ? 'zh' : 'en'}
      companyName={isChinaSite ? '成都打破对称科技有限公司' : 'BREAK SYMMETRY TECHNOLOGY'}
      domesticDomainLink={isChinaSite
        ? <a href="https://breaksymmetry.cn">.CN</a>
        : undefined}
      domesticLegalLinks={isChinaSite
        ? <>
            <a href="/static/agreement.html" target="_blank">游戏许可及服务协议</a>
            <a href="/static/privacy.html" target="_blank">游戏隐私保护指引</a>
          </>
        : undefined}
      domesticFilingLinks={isChinaSite
        ? <>
            <a href="https://beian.mps.gov.cn/#/query/webSearch?code=51015602001170" target="_blank" rel="noreferrer">川公网安备51015602001170</a>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">蜀ICP备2024112178号</a>
          </>
        : undefined}
    />
  );
}
