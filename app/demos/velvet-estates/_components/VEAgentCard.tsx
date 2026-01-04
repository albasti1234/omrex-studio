"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import VEIcon from "./VEIcon";
import { Agent } from "../_data/agents";

interface VEAgentCardProps {
    agent: Agent;
}

export default function VEAgentCard({ agent }: VEAgentCardProps) {
    return (
        <Link href={`/demos/velvet-estates/agents/${agent.slug}`}>
            <motion.article
                className="group cursor-pointer text-center"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Photo */}
                <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden bg-ve-surface border-2 border-ve-border group-hover:border-ve-accent transition-colors">
                    {/* Agent Photo */}
                    <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover"
                        sizes="160px"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-ve-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <h3 className="text-xl font-serif font-semibold text-ve-text group-hover:text-ve-accent transition-colors mb-1">
                    {agent.name}
                </h3>
                <p className="text-sm font-medium text-ve-accent mb-2">
                    {agent.title}
                </p>
                <p className="text-sm text-ve-muted mb-4">
                    {agent.specialty}
                </p>

                {/* Stats */}
                <div className="flex justify-center gap-6 text-sm">
                    <div>
                        <span className="font-semibold text-ve-text">{agent.salesVolume}</span>
                        <span className="text-ve-muted ml-1">Volume</span>
                    </div>
                    <div>
                        <span className="font-semibold text-ve-text">{agent.yearsExperience}</span>
                        <span className="text-ve-muted ml-1">Years</span>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}
