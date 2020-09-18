package net.yttravelers.spotshare.repositories

import net.yttravelers.spotshare.entities.Spot
import org.springframework.data.jpa.repository.JpaRepository

interface SpotRepository: JpaRepository<Spot, Int> {
}