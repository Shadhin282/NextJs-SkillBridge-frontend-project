'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, BookOpen, User, GraduationCap } from "lucide-react";
import { StudentProfile } from "../../../../types";

interface Props {
  profile: StudentProfile;
}

export default function StudentProfileCard({ profile }: Props) {
  return (
    <Card className="max-w-2xl mx-auto shadow-md rounded-2xl">
      
      <CardHeader className="flex flex-row items-center gap-4">
        
        <Avatar className="w-20 h-20">
          <AvatarImage src={profile.student.image || ""} />
          <AvatarFallback>
            {profile.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {profile.student.email}
          </p>
          <p className="text-sm text-muted-foreground">
            Student ID: {profile.studentId}
          </p>
        </div>

      </CardHeader>

      <CardContent className="space-y-4">

        {/* Bio */}
        <div className="flex gap-2 items-start">
          <User className="w-4 h-4 mt-1" />
          <p className="text-sm">
            {profile.bio || "No bio provided"}
          </p>
        </div>

        {/* Department */}
        <div className="flex gap-2 items-center">
          <GraduationCap className="w-4 h-4" />
          <span className="font-medium">
            {profile.department || "No department"}
          </span>
        </div>

        {/* Favorite Subjects */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4" />
            <span className="font-semibold">
              Favorite Subjects
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.FavroiteSubjects.map((subject, index) => (
              <Badge key={index} variant="secondary">
                {subject}
              </Badge>
            ))}
          </div>

        </div>

      </CardContent>

    </Card>
  );
}
