import React from 'react';
import { Container } from 'react-bootstrap';
import styles from "../style/cssmodule/components/footer.module.css";

const Footer = () => {
    return (
        <Container className={styles.footer}>
            <div className={styles.noticeBox}>
                <a href="/">공지사항</a>
                <a href="/">서비스 전체보기</a>
            </div>
            <div className={styles.asideBox}>
                <div className={styles.areaUser}>
                    <div className={styles.areaUserRow}>
                        <span className={styles.textBold13}>Creators</span>
                        <ul className={styles.ul}>
                            <li className={styles.areaUserRowLi}><a href="/">크리에이터</a></li>
                            <li className={styles.areaUserRowLi}><a href="/">스몰비즈니스</a></li>
                        </ul>
                    </div>
                    <div className={styles.areaUserRow}>
                        <span className={styles.textBold13}>Partners</span>
                        <ul className={styles.ul}>
                            <li><a href="/">비즈니스 광고</a></li>
                            <li><a href="/">스토어 개설</a></li>
                            <li><a href="/">지역업체 등록</a></li>
                        </ul>
                    </div>
                    <div className={styles.areaUserRow}>
                        <span className={styles.textBold13}>Developers</span>
                        <ul className={styles.ul}>
                            <li><a href="/">오미자 개발자센터</a></li>
                            <li><a href="/">오픈API</a></li>
                            <li><a href="/">오픈소스</a></li>
                            <li><a href="/">오미자 D2</a></li>
                            <li><a href="/">오미자 D2SF</a></li>
                            <li><a href="/">오미자 랩스</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.areaCol}>
                    <div className={styles.acContent}>
                        <div className={styles.textBold13}>github 바로가기</div>
                        <div className={styles.acLink}><a href="/">다운받기</a></div>
                    </div>
                    <a href="https://github.com/ldh4155/2023"><img src="https://lh3.googleusercontent.com/fife/ALs6j_EgZRSg1oI6KoZmTRXFt8PsMbwao1_-C2_ph2kFSn3iwPbU0u6_R-puD3tYT2P6mKzrxMV6UIJjCA2LFRbf6OModwH2QYpZR7YzJ86r9kEhzl-tv-mRAT5IbsYMmicIb7mPek8Dfqbwpnl7kPLJLqfni3fr1hxnBfu9v8b1K5ABpkDbXUAJH4o4BaYaz6MUrEMB2VMENdOkZ2LmOGh8Thzdbe5SXnnoIxr6xNpKyYjv3j8kMERQqT82tTc25MqMbSGjXW_kMIqrm29gHUQPOMpK0_6oTzn13ww5oXCUwS_hYmP6eX1bfgQkXPixY48yoMoSlVIn7TXh7C6hh0Mm5i2zPTpJRsbb8PqLVZ5z2gpmnciUUZYKPoHT3GWDxfdj3xOPt1Z9pciQLSsVwGuh2Fg1ExRkG8saggEv4vX7YNyo1dpwelfOcBu0IgUQh_JBkp2W6r1c-9PuyWVBXVMby5KBy0V4fD-gw8R_UcrJsrVBtoDYwIvKrMoKgZzKezg2qPAvANBC0PXIZOkpd3kIkabcqLMJzonj4UMITImqq1H_TDe-s3xY1y0Gh2uF3MFn_gucNhZ1CAawOI_G2SuydccMy4sJFAOf56R54d4-YQWcZQSqokTxBT7CV56HjVBzszr3pJYHd_sktY80LSnWJPWJRzRGfwHfJiTrDBi4DtkS8eH9qYYxkKiZA4DqdN5pXWQ1rH3oGsDb13P8CPnegEEoxBdwWoh0G_3oRVCKNW1rR1P3JrdZhQUkxEmQOwt7JLDDfLVkLaE0n0i2A-nDMyS5YCPkroPU5emIJcVGxeXqjOD3pdgVs9fgQ0IAj0k1ZCzg3P3ZoZDk-ay0VRYTklL3c7hSuAlvPv2ji9krXS1MTGHP2bUeuMxniJpFg5kgtAe8UQvjpNr-Ewqeo6twdX3fR5VgyvrpjJCHmCcoAK-ffEqee64X5DIhT7v4LBxbgWFwUYSsG-WzGlPSXD1egwFETIwuen-2d3bTPDlJGg0_T81XRNdfAL5bM8Iku6U13gwDqCc1s1I6e-twpN-bATOLQr55Kcsd1aDSY5nWeQgMXoTFpQv4ed5E-v1TPBAadE2v5Qvb_xNuQyWycgrlOnmvQD5iFv2f1tBvZohaho9XEuIq-20FtaXKrfwGIpMMg8jKduCWAQq-j5tYUUtcu9yhfSc1iSrJfRutXFWbqbov3VbSQ58H0RER4wqqrh2hva6T2QUkMZWoZuNTtUx7cWWxPT8aHjdtWi5Zm5n_wb4wzrXnFLv_nPM9alGFYw53ydjmQ0lm1eWJ0w569Bp1kZv8PRTX9i1aLD6pvgm1BmPQYGG1pIiZAhNRYKNSfNFjEMT-YO_0uzsFces0aONpbICsuwyBsO0huhl_dvd2kchsheNqzNQkhBMNhH8KVcvNZ-dYyDJPfexZkpZukdlAHT4Xdobax0wLhujDeQJe4BL6PxLi7fur5X6kU4Lsmkvef5QkY5FhqPocT7hVXGU8F5z8vIqsfEfzWTyYEvHgtrvUt9sQAHZfUTzT8orgoIKUrjH_SdkzEILqrMFwoDmrKw_zzik9zaG5n5xk_JSZLJs_3ZevuhBcqWlV-JWd5SiJtRz6IoOpvFvHSrGI=w1019-h919" className={styles.acImg} /></a>
                </div>
                <div className={styles.areaCol}>
                    <div className={styles.acContent}>
                        <div className={styles.textBold13}>프로젝트 꽃</div>
                        <div className={styles.acLink}><a href="/">바로가기</a></div>
                    </div>
                    <a href="https://github.com/ldh4155/2023"><img src="https://lh3.googleusercontent.com/fife/ALs6j_EgZRSg1oI6KoZmTRXFt8PsMbwao1_-C2_ph2kFSn3iwPbU0u6_R-puD3tYT2P6mKzrxMV6UIJjCA2LFRbf6OModwH2QYpZR7YzJ86r9kEhzl-tv-mRAT5IbsYMmicIb7mPek8Dfqbwpnl7kPLJLqfni3fr1hxnBfu9v8b1K5ABpkDbXUAJH4o4BaYaz6MUrEMB2VMENdOkZ2LmOGh8Thzdbe5SXnnoIxr6xNpKyYjv3j8kMERQqT82tTc25MqMbSGjXW_kMIqrm29gHUQPOMpK0_6oTzn13ww5oXCUwS_hYmP6eX1bfgQkXPixY48yoMoSlVIn7TXh7C6hh0Mm5i2zPTpJRsbb8PqLVZ5z2gpmnciUUZYKPoHT3GWDxfdj3xOPt1Z9pciQLSsVwGuh2Fg1ExRkG8saggEv4vX7YNyo1dpwelfOcBu0IgUQh_JBkp2W6r1c-9PuyWVBXVMby5KBy0V4fD-gw8R_UcrJsrVBtoDYwIvKrMoKgZzKezg2qPAvANBC0PXIZOkpd3kIkabcqLMJzonj4UMITImqq1H_TDe-s3xY1y0Gh2uF3MFn_gucNhZ1CAawOI_G2SuydccMy4sJFAOf56R54d4-YQWcZQSqokTxBT7CV56HjVBzszr3pJYHd_sktY80LSnWJPWJRzRGfwHfJiTrDBi4DtkS8eH9qYYxkKiZA4DqdN5pXWQ1rH3oGsDb13P8CPnegEEoxBdwWoh0G_3oRVCKNW1rR1P3JrdZhQUkxEmQOwt7JLDDfLVkLaE0n0i2A-nDMyS5YCPkroPU5emIJcVGxeXqjOD3pdgVs9fgQ0IAj0k1ZCzg3P3ZoZDk-ay0VRYTklL3c7hSuAlvPv2ji9krXS1MTGHP2bUeuMxniJpFg5kgtAe8UQvjpNr-Ewqeo6twdX3fR5VgyvrpjJCHmCcoAK-ffEqee64X5DIhT7v4LBxbgWFwUYSsG-WzGlPSXD1egwFETIwuen-2d3bTPDlJGg0_T81XRNdfAL5bM8Iku6U13gwDqCc1s1I6e-twpN-bATOLQr55Kcsd1aDSY5nWeQgMXoTFpQv4ed5E-v1TPBAadE2v5Qvb_xNuQyWycgrlOnmvQD5iFv2f1tBvZohaho9XEuIq-20FtaXKrfwGIpMMg8jKduCWAQq-j5tYUUtcu9yhfSc1iSrJfRutXFWbqbov3VbSQ58H0RER4wqqrh2hva6T2QUkMZWoZuNTtUx7cWWxPT8aHjdtWi5Zm5n_wb4wzrXnFLv_nPM9alGFYw53ydjmQ0lm1eWJ0w569Bp1kZv8PRTX9i1aLD6pvgm1BmPQYGG1pIiZAhNRYKNSfNFjEMT-YO_0uzsFces0aONpbICsuwyBsO0huhl_dvd2kchsheNqzNQkhBMNhH8KVcvNZ-dYyDJPfexZkpZukdlAHT4Xdobax0wLhujDeQJe4BL6PxLi7fur5X6kU4Lsmkvef5QkY5FhqPocT7hVXGU8F5z8vIqsfEfzWTyYEvHgtrvUt9sQAHZfUTzT8orgoIKUrjH_SdkzEILqrMFwoDmrKw_zzik9zaG5n5xk_JSZLJs_3ZevuhBcqWlV-JWd5SiJtRz6IoOpvFvHSrGI=w1019-h919" className={styles.acImg}/></a>
                </div>
            </div>
            <div className={styles.bottomBox}>
            <ul>
                    <li className={styles.bottomBoxLi}><a href="/">회사소개</a></li>
                    <li className={styles.bottomBoxLi}><a href="/">인재채용</a></li>
                    <li className={styles.bottomBoxLi}><a href="/">제휴제안</a></li>
                    <li className={styles.bottomBoxLi}><a href="/">이용약관</a></li>
                    <li className={styles.bottomBoxLi}><a href="/">개인정보처리방침</a></li>
                    <li className={styles.bottomBoxLi}><a href="/">청소년보호정책</a></li>
                    <li className={styles.bottomBoxLi}><a href="/">오미자마켓 정책</a></li>
                    <li className={styles.bottomBoxLi}><a href="/">고객센터</a></li>
                    <li className={`${styles.bottomBoxLi} ${styles.bottomBoxLiLast}`}><a href="/">&copy; OMIJA Corp.</a></li>
                </ul>
            </div>
        </Container>
    );
};

export default Footer;