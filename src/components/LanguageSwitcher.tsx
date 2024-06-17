// components/LanguageSwitcher.js
import Link from 'next/link';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
    const router = useRouter();
    const { locale, locales, pathname, query } = router;

    return (
        <div>
            {locales.map((lng) => (
                <Link key={lng} href={{ pathname, query }} locale={lng}>
          <span style={{ margin: 10, fontWeight: locale === lng ? 'bold' : 'normal' }}>
            {lng === 'en' ? 'English' : 'العربية'}
          </span>
                </Link>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
