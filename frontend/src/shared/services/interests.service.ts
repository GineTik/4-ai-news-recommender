"use client";

export const setInterests = (interests: number[]) => {
  localStorage.setItem("interests", JSON.stringify(interests));
};

export const getInterests = () => {
  return JSON.parse(localStorage.getItem("interests") || "[]") as number[];
};
