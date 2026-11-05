import PageHero from '@/components/ui/PageHero';
import { ButtonLink } from '@/components/ui/links';

export default function NotFound() {
  return (
    <PageHero
      overline="Error 404 · Page not found"
      title="This page has not been cleared for entry."
      subtitle="The page you are looking for may have moved. Please return to the home page or contact our government team."
      actions={
        <>
          <ButtonLink href="/" variant="contained" color="secondary" size="large">
            Return home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outlined" size="large" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.45)' }}>
            Contact us
          </ButtonLink>
        </>
      }
    />
  );
}
