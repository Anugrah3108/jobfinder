//@ts-nocheck
"use client";
import {
  Badge,
  Box,
  Button,
  Card,
  Tabs,
  Text,
  TextArea,
} from "@radix-ui/themes";
import CompanyJobCard from "./cards/company-job-card";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/(group)/layout";

export default function CompanyListingAndReviews({ reviews, company }) {
  const [review, setReview] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const { user } = useContext(UserContext);

  async function handleCreateReview() {
    const reviewToSave = {
      content: review,
      company_id: company.id,
    };

    const finalReview = {
      ...reviewToSave,
      user,
    };

    const res = await fetch("/api/review/", {
      method: "POST",
      body: JSON.stringify(reviewToSave),
    });

    const data = await res.json();

    if (data.success) {
      alert("Review created.");
      setReviewList(finalReview, ...reviewList);
      setReview("");
    } else {
      alert("Something went wrong.");
    }
  }

  //   useEffect(() => {
  //     async ()=>{

  //     }
  //   }, [] );

  return (
    <Tabs.Root defaultValue="listed-jobs">
      <Tabs.List>
        <Tabs.Trigger value="listed-jobs">Job Listing</Tabs.Trigger>
        <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>

      <Box pt="3">
        <Tabs.Content value="listed-jobs">
          <div className="p-2 bg-transparent rounded-md">
            {company.jobs.map((job) => {
              return <CompanyJobCard key={job.id} job={job} />;
            })}
          </div>
        </Tabs.Content>

        <Tabs.Content value="reviews">
          <div>
            <TextArea
              placeholder="Add a review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <Button onClick={handleCreateReview} style={{ marginTop: 10 }}>
              Add review
            </Button>
          </div>
          <Card style={{ marginTop: 10 }}>
            <Text size="2">Top reviews</Text>
            <div className="flex flex-col gap-4">
              {reviews.map((review) => {
                return (
                  <Card key={review.id}>
                    <p>{review.content}</p>
                    <Badge>{review.user.email}</Badge>
                  </Card>
                );
              })}
            </div>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="settings">
          <Text size="2">Coming soon...</Text>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
