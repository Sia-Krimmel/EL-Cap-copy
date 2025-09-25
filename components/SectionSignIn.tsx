'use client';

import styles from '@components/SectionSignIn.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';
import * as HTTP from '@common/http';

import Button from '@components/Button';
import Cookies from 'universal-cookie';
import InputWithLabel from '@components/InputWithLabel';

const cookie = new Cookies();

export default function SectionSignIn(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <div className={styles.full}>
      <div className={styles.body}>
        <InputWithLabel label="E-mail" name="email" onChange={(e) => setEmail(e.target.value)} type="text" value={email} />
        <InputWithLabel label="Password" name="password" onChange={(e) => setPassword(e.target.value)} type="password" value={password} />
        <div className={styles.actions}>
          <Button
            onClick={async () => {
              setLoading(true);
              const response = await HTTP.authenticate({ email, password });
              if (!response || response.error) {
                alert('Failed to sign you in (1)');
                setEmail('');
                setPassword('');
                return setLoading(false);
              }

              if (!response.user) {
                alert('Failed to sign you in (2)');
                return setLoading(false);
              }

              if (Utilities.isEmpty(response.user.key)) {
                alert('Failed to sign you in (3)');
                return setLoading(false);
              }

              // NOTE(jim)
              // Cookie based authentication
              cookie.set('elcap_txt', response.user.key, { sameSite: 'strict', path: '/' });

              // NOTE(jimmylee)
              // If the user has a username, they are properly setup.
              if (response.user.username) {
                window.location.href = `/${response.user.username}`;
                return;
              }

              // NOTE(jimmylee)
              // app/[username]/page.tsx knows how to handle this case.
              window.location.href = `/${response.user.email}`;
            }}
          >
            {loading ? `⌛` : `Sign in`}
          </Button>
          <p className={styles.p}>
            Sign in with your elcap.xyz e-mail. Once you verify your e-mail you will be able to use our editor, save your posts, and publish anything you like on the internet.
          </p>
          <p className={styles.p} style={{ marginTop: 24 }}>
            By using this blog, you agree to{' '}
            <a href="https://internet.dev/" className={styles.link} target="_blank">
              {' '}
              Internet Development Studio Company's
            </a>{' '}
            <a href="https://txt.dev/wwwjim/intdev-terms-of-service" className={styles.link} target="_blank">
              Terms of Service
            </a>
            ,{' '}
            <a href="https://txt.dev/wwwjim/intdev-privacy-policy" className={styles.link} target="_blank">
              Privacy Policy
            </a>
            , and{' '}
            <a href="https://txt.dev/wwwjim/intdev-acceptable-use" className={styles.link} target="_blank">
              Acceptable Use Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
