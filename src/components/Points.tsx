import React from "react";

type Props = {
  points: number;
};

const Points = ({ points }: Props) => (
  <h1 className="display-6">You have {points} life points left!</h1>
);

export default Points;
