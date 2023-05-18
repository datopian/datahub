import { Button } from './Button';
import { Container } from './Container';

export function Hero({ countriesCount, datasetsCount, filesCount }) {
  return (
    <div className="relative pb-20 pt-10 sm:py-40" id="hero">
      <div className="absolute inset-x-0 -bottom-14 -top-48 overflow-hidden bg-green-50 bg-opacity-50">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter text-emerald-600 sm:text-7xl">
            It's our money!
          </h1>
          <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-emerald-900">
            <p>
              By understanding how governments spend money in our name can we
              have a say in how that money will affect our own lives. The
              journey starts here.
            </p>
            <p>
              OpenSpending is a free, open and global platform to search,
              visualise and analyse fiscal data in the public sphere.
            </p>
          </div>
          <Button href="#datasets" className="mt-10">
            Search datasets
          </Button>
          <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              //  Added the plus sign because some datasets do not
              //  contain defined countries
              ['Countries', '+' + countriesCount],
              ['Datasets', datasetsCount],
              ['Files', filesCount],
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="font-mono text-sm text-emerald-600">{name}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-emerald-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
