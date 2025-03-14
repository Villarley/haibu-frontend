import { Search, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function RightSidebar() {
  const peopleToFollow = [
    {
      name: "Kevin Latino",
      handle: "@KevinLatino",
      avatar:
        "https://pbs.twimg.com/profile_images/1853501471339229184/NG1UhuP1_400x400.jpg",
      bio: "Founder and CTO of Haibu",
      username: "KevinLatino"
    },
    {
      name: "Santiago Villarreal",
      handle: "@villarley",
      avatar:
        "https://pbs.twimg.com/profile_images/1856540261385469952/mC-Mntm6_400x400.jpg",
      bio: "COO Haibu",
      username: "Villarley"
    },
    {
      name: "Saymon Porras",
      handle: "@CtpN3m0",
      avatar:
        "https://pbs.twimg.com/profile_images/1852100218520535040/7Gyr1zZQ_400x400.jpg",
      bio: "Founder and Developer of Haibu",
      username: "CtpN3m0"
    },
  ];

  const trendingHashtags = ["#haibu", "#haika", "#haitoken", "#haiclick"];

  return (
    <div className="w-80 space-y-6 p-4">
      <div className="sticky top-0 z-10 bg-white dark:bg-primary-dark pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tertiary dark:bg-primary dark:text-white"
          />
        </div>
      </div>

      <div className="bg-accent/10 dark:bg-primary rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4 text-primary-dark dark:text-white flex items-center">
          <Users className="mr-2 h-5 w-5 text-tertiary" /> Meet Users
        </h2>
        <div className="space-y-4">
          {peopleToFollow.map((person) => (
            <div
              key={person.handle}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={person.avatar || "/placeholder.svg"}
                  alt={person.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <Link href={"/u/"+person.username}>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {person.name}
                    </p>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {person.handle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent/10 dark:bg-primary rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4 text-primary-dark dark:text-white flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-tertiary" /> Trending
        </h2>
        <div className="space-y-2 pl-5">
          {trendingHashtags.map((hashtag, index) => (
            <p
              key={index}
              className="text-xl text-gray-800 dark:text-white font-semibold"
            >
              {hashtag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
