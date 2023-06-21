"use client";

import React, { useState, useEffect } from 'react';
import Dashboard from '../components/dashboard';
import DisableScroll from '../components/disablescroll';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState(null) as any;
    const [userDetails, setUserDetails] = useState(null) as any;

    useEffect(() => {
        const fetchUserInfo = async () => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            router.push(process.env.NEXT_PUBLIC_AUTH_DOMAIN + '/login/mail');
            return;
        }

        const response = await fetch(process.env.NEXT_PUBLIC_API_DOMAIN + "/webmail/jwt_details", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
              onlyVerify: false,
            }),
          });

            if (!response.ok) {
                localStorage.removeItem("jwt");
                router.push(process.env.NEXT_PUBLIC_AUTH_DOMAIN + '/login/mail');
                return;
            }
            const data = await response.json();
            setUserInfo(data);

        const detailsResponse = await fetch(process.env.NEXT_PUBLIC_API_DOMAIN + "/webmail/user_details", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: data.user_id,
            }),
          });
          if (!detailsResponse.ok) {
            localStorage.removeItem("jwt");
            router.push(process.env.NEXT_PUBLIC_AUTH_DOMAIN + '/login/mail');
            return;
          }

            const detailsData = await detailsResponse.json();
            setUserDetails(detailsData);
        };
        fetchUserInfo();
    }, [router]);

    if (!userInfo || !userDetails) {
        return null;
    }

    return (
        <div className="">
            <section>
                <DisableScroll />
                <Dashboard userInfo={userInfo} userDetails={userDetails} />
            </section>
        </div>
    )
}
